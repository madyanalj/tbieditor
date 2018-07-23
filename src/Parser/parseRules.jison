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
  | IDENTIFIER ASSIGN expression
    -> new Assignment($IDENTIFIER, $expression)
  | unary_operator expression
    -> new $1($expression)
  | expression binary_operator expression
    -> new $2($1, $3)
;

expression
  : literal
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

unary_operator
  : RARROW
    -> ExportStatement
  | NOT
    -> NotOperation
;

binary_operator
  : PLUS
    -> AdditionOperation
  | MINUS
    -> SubtractionOperation
  | ASTERISK
    -> MultiplicationOperation
  | SLASH
    -> DivisionOperation
  | EQ
    -> EQOperation
  | IEQ
    -> IEQOperation
  | GT
    -> GTOperation
  | GTEQ
    -> GTEQOperation
  | LT
    -> LTOperation
  | LTEQ
    -> LTEQOperation
  | AND
    -> AndOperation
  | OR
    -> OrOperation
;
