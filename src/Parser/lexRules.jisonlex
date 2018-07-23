%%

[\r\n]+
  return 'NEWLINE'

\s+
  // skip non-newline whitespaces

'//'.*[^\r\n]?
  // skip single-line comments

'/*'[\s\S]*?'*/'
  // skip multi-line comments

'->'
  return 'RARROW'

'+'
  return 'PLUS'

'-'
  return 'MINUS'

'*'
  return 'ASTERISK'

'='
  return 'EQ'

'>'
  return 'GT'

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
