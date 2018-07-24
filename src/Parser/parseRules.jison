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
  : statements
    -> new Block($statements)
;

statements
  : // optional
    -> []
  | statement
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
  | '[' array_elements comma? ']'
    -> new Literal($2)
;

array_elements
  : // optional
    -> []
  | expression
    -> [$expression]
  | array_elements ',' expression
    { $$.push($expression) }
;

comma?
  : // optional
  | ','
;

unary_operation
  : '!' expression
    -> new NotOperation($2)
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
