import {cn, getUrlFromString} from '~/lib/utils'
import type {Editor} from '@tiptap/core'
import {Check, Trash} from 'lucide-react'
import type {Dispatch, FC, SetStateAction} from 'react'
import {useEffect, useRef} from 'react'

interface LinkSelectorProps {
  editor: Editor
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus()
  })

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <p className="text-base">↗</p>
        <p
          className={cn('underline decoration-gray-400 underline-offset-4', {
            'text-blue-500': editor.isActive('link'),
          })}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={e => {
            e.preventDefault()
            const input = e.currentTarget[0] as HTMLInputElement
            const url = getUrlFromString(input.value)
            url && editor.chain().focus().setLink({href: url}).run()
            setIsOpen(false)
          }}
          className="rounded fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden border border-gray-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run()
                setIsOpen(false)
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 text-gray-600 transition-all hover:bg-gray-100">
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  )
}
