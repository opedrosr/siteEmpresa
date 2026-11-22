import { Fragment } from 'react'
import type { CSSProperties } from 'react'

// Palavras mascaradas: cada palavra sobe de dentro de uma "janela" quando o bloco aparece.
export default function Words({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="w">
            <span style={{ '--i': from + index } as CSSProperties}>{word}</span>
          </span>{' '}
        </Fragment>
      ))}
    </>
  )
}
