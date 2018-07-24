%left OR
%left AND
%left EQ IEQ GT GTEQ LT LTEQ
%left PLUS MINUS
%left ASTERISK SLASH
%right NOT

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
  | PLUS IDENTIFIER
    -> new NodeAddition($IDENTIFIER)
  | GT IDENTIFIER
    -> new NodeSelection($IDENTIFIER)
  | RARROW expression
    -> new ExportStatement($expression)
  | IDENTIFIER ASSIGN expression
    -> new Assignment($IDENTIFIER, $expression)
;

expression
  : unary_operation
  | binary_operation
  | literal
  | IDENTIFIER
    -> new Identifier($IDENTIFIER)
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
;

unary_operation
  : NOT expression
    -> new NotOperation($2)
;

binary_operation
  : expression PLUS expression
    -> new AdditionOperation($1, $3)
  | expression MINUS expression
    -> new SubtractionOperation($1, $3)
  | expression ASTERISK expression
    -> new MultiplicationOperation($1, $3)
  | expression SLASH expression
    -> new DivisionOperation($1, $3)
  | expression EQ expression
    -> new EQOperation($1, $3)
  | expression IEQ expression
    -> new IEQOperation($1, $3)
  | expression GT expression
    -> new GTOperation($1, $3)
  | expression GTEQ expression
    -> new GTEQOperation($1, $3)
  | expression LT expression
    -> new LTOperation($1, $3)
  | expression LTEQ expression
    -> new LTEQOperation($1, $3)
  | expression AND expression
    -> new AndOperation($1, $3)
  | expression OR expression
    -> new OrOperation($1, $3)
;
