import type { Set } from 'scryfall-api'
import { Breadcrumb, Message } from '../../../components/ui'
import { use } from 'react'
import { useParams } from 'react-router'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise }) => {
  const set = use(setPromise)
  const { code } = useParams<{ code: string }>()

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Sets', path: `/sets/` },
          { name: set?.name || code || '', path: `/sets/${code}` },
        ]}
      />
      {set ? (
        <div>
          <p>{set.name}</p>
        </div>
      ) : (
        <Message
          className="mt-3"
          variant="error"
          text={`Set ${code ? `"${code}"` : ''} not found.`}
        />
      )}
    </>
  )
}
