%left '||'
%left '&&'
%left '==' '!=' '>' '>=' '<' '<='
%left '+' '-'
%left '*' '/'
%right '!'
%left '[' ']'

%start program

%%

program
  : block EOF
    { return $block }
;

block
  : OPT_statements
    -> new Block($OPT_statements)
;

OPT_statements
  : // optional
    -> []
  | statements
;

statements
  : statement
    -> [$statement]
  | statements NEWLINE statement
    { $$.push($statement) }
;

statement
  : expression
  | '+'
    -> new NodeAddition('#__')
  | '+' IDENTIFIER
    -> new NodeAddition($IDENTIFIER)
  | '>' IDENTIFIER
    -> new NodeSelection($IDENTIFIER)
  | '->' expression
    -> new ExportStatement($expression)
  | IDENTIFIER '=' expression
    -> new Assignment($IDENTIFIER, $expression)
  | FOR IDENTIFIER IN expression BLOCK_START block BLOCK_END
    -> new ForLoop($IDENTIFIER, $expression, $block)
  | IF expression BLOCK_START block BLOCK_END OPT_else_ifs OPT_else
    -> new IfStatement($expression, $block, $OPT_else_ifs, $OPT_else)
;

expression
  : unary_operation
  | binary_operation
  | literal
  | IDENTIFIER
    -> new Identifier($IDENTIFIER)
  | '(' expression ')'
    -> $expression
  | FUNC '(' OPT_comma_separated_identifiers OPT_comma ')' BLOCK_START block BLOCK_END
    -> new FunctionDeclaration($OPT_comma_separated_identifiers, $block)
  | IDENTIFIER '(' OPT_comma_separated_expressions OPT_comma ')'
    -> new FunctionCall($IDENTIFIER, $OPT_comma_separated_expressions)
;

literal
  : NUMBER
    -> new Literal(processNumber($NUMBER))
  | '-' NUMBER
    -> new Literal(processNumber('-' + $NUMBER))
  | STRING
    -> new Literal(processString($STRING))
  | TRUE
    -> new Literal(true)
  | FALSE
    -> new Literal(false)
  | '[' OPT_comma_separated_expressions OPT_comma ']'
    -> new Literal($OPT_comma_separated_expressions)
;

OPT_comma_separated_identifiers
  : // optional
    -> []
  | comma_separated_identifiers
;

comma_separated_identifiers
  : IDENTIFIER
    -> [$IDENTIFIER]
  | OPT_comma_separated_identifiers ',' IDENTIFIER
    { $$.push($IDENTIFIER) }
;

OPT_comma_separated_expressions
  : // optional
    -> []
  | comma_separated_expressions
;

comma_separated_expressions
  : expression
    -> [$expression]
  | OPT_comma_separated_expressions ',' expression
    { $$.push($expression) }
;

OPT_comma
  : // optional
  | ','
;

unary_operation
  : '!' expression
    -> new NotOperation($expression)
;

binary_operation
  : expression '+' expression
    -> new AdditionOperation($1, $3)
  | expression '-' expression
    -> new SubtractionOperation($1, $3)
  | expression '*' expression
    -> new MultiplicationOperation($1, $3)
  | expression '/' expression
    -> new DivisionOperation($1, $3)
  | expression '==' expression
    -> new EQOperation($1, $3)
  | expression '!=' expression
    -> new IEQOperation($1, $3)
  | expression '>' expression
    -> new GTOperation($1, $3)
  | expression '>=' expression
    -> new GTEQOperation($1, $3)
  | expression '<' expression
    -> new LTOperation($1, $3)
  | expression '<=' expression
    -> new LTEQOperation($1, $3)
  | expression '&&' expression
    -> new AndOperation($1, $3)
  | expression '||' expression
    -> new OrOperation($1, $3)
  | expression '[' expression ']'
    -> new MemberOperation($1, $3)
;

OPT_else_ifs
  : // optional
  | else_ifs
;

else_ifs
  : else_if
    -> [$else_if]
  | else_ifs else_if
    { $$.push($else_if) }
;

else_if
  : ELIF expression BLOCK_START block BLOCK_END
  -> { condition: $expression, body: $block }
;

OPT_else
  : // optional
  | ELSE BLOCK_START block BLOCK_END
  -> $block
;
