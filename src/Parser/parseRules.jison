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
  | IDENTIFIER ASSIGN expression
    -> new Assignment($IDENTIFIER, $expression)
;

expression
  : literal
  | IDENTIFIER
    -> new Identifier($IDENTIFIER)
;

literal
  : NUMBER
    -> new Literal(Number($NUMBER))
;
