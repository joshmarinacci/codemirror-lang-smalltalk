import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const SmalltalkLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false}),
        Block: delimitedIndent({closing: "]", align: false}),
      }),
      foldNodeProp.add({
        Application: foldInside,
        Block: foldInside,
      }),
      styleTags({
        Keyword: t.keyword,
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        Number: t.integer,
        Operator: t.operator,
        LineComment: t.lineComment,
        "[ ]": t.bracket,
        "( )": t.bracket,
        "{ }": t.bracket,
      })
    ]
  }),
  languageData: {
      closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
  }
})

export function Smalltalk() {
  return new LanguageSupport(SmalltalkLanguage)
}
