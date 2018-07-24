%%

[\r\n]+
  return 'NEWLINE'

\s+
  // skip non-newline whitespaces

'//'.*[^\r\n]?
  // skip single-line comments

'/*'[\s\S]*?'*/'
  // skip multi-line comments

'('
  return 'LPARAN'

')'
  return 'RPARAN'

'['
  return 'LBRACKET'

']'
  return 'RBRACKET'

','
  return 'COMMA'

'->'
  return 'RARROW'

'+'
  return 'PLUS'

'-'
  return 'MINUS'

'*'
  return 'ASTERISK'

'/'
  return 'SLASH'

'=='
  return 'EQ'

'!='
  return 'IEQ'

'='
  return 'ASSIGN'

'>='
  return 'GTEQ'

'>'
  return 'GT'

'<='
  return 'LTEQ'

'<'
  return 'LT'

'&&'
  return 'AND'

'||'
  return 'OR'

'!'
  return 'NOT'

('true'|'false')\b
  return yytext.toUpperCase()

\d*('.'\d+)\b
  return 'NUMBER'

\d+\b
  return 'NUMBER'

"'".*"'"
  return 'STRING'

[$#\w][-\w]*
  return 'IDENTIFIER'

<<EOF>>
  return 'EOF'
