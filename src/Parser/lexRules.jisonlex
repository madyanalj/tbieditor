%options ranges

%%

'{'
  return 'BLOCK_START'

[\r\n]*'}'
  return 'BLOCK_END'

[\r\n]*<<EOF>>
  return 'EOF'

[\r\n]*'//'.*[^\r\n]?[\r\n]*<<EOF>>
  return 'EOF'

[\r\n]*'/*'[\s\S]*?'*/'[\r\n]*<<EOF>>
  return 'EOF'

'//'.*[^\r\n]?
  // skip single-line comments

'/*'[\s\S]*?'*/'
  // skip multi-line comments

[\r\n]+
  return 'NEWLINE'

\s+
  // skip non-newline whitespaces

'('
  return '('

')'
  return ')'

'['
  return '['

']'
  return ']'

','
  return ','

'->'
  return '->'

'+'
  return '+'

'-'
  return '-'

'*'
  return '*'

'/'
  return '/'

'=='
  return '=='

'!='
  return '!='

'='
  return '='

'>='
  return '>='

'>'
  return '>'

'<='
  return '<='

'<'
  return '<'

'&&'
  return '&&'

'||'
  return '||'

'!'
  return '!'

('for'|'in')\b
  return yytext.toUpperCase()

('if'|'elif'|'else')\b
  return yytext.toUpperCase()

('true'|'false')\b
  return yytext.toUpperCase()

'func'\b
  return yytext.toUpperCase()

\d*('.'\d+)\b
  return 'NUMBER'

\d+\b
  return 'NUMBER'

"'".*"'"
  return 'STRING'

[$#\w][-\w]*
  return 'IDENTIFIER'
