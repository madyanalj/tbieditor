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
  | IDENTIFIER EQ expression
    -> new Assignment($IDENTIFIER, $expression)
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
