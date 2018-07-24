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
  | '+' IDENTIFIER
    -> new NodeAddition($IDENTIFIER)
  | '>' IDENTIFIER
    -> new NodeSelection($IDENTIFIER)
  | '->' expression
    -> new ExportStatement($expression)
  | IDENTIFIER '=' expression
    -> new Assignment($IDENTIFIER, $expression)
  | FOR IDENTIFIER IN expression '{' block '}'
    -> new ForLoop($IDENTIFIER, $expression, $block)
  | IF expression '{' block '}' OPT_else_ifs OPT_else
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
;

literal
  : NUMBER
    -> new Literal(processNumber($NUMBER))
  | STRING
    -> new Literal(processString($STRING))
  | TRUE
    -> new Literal(true)
  | FALSE
    -> new Literal(false)
  | '[' OPT_array_elements OPT_comma ']'
    -> new Literal($OPT_array_elements)
;

OPT_array_elements
  : // optional
    -> []
  | array_elements
;

array_elements
  : expression
    -> [$expression]
  | OPT_array_elements ',' expression
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
  : ELIF expression '{' block '}'
  -> { condition: $expression, body: $block }
;

OPT_else
  : // optional
  | ELSE '{' block '}'
  -> $block
;
