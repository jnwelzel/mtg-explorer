import { Breadcrumb } from '../components/ui'

export const SetsPage: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[{ name: 'Sets', path: `/sets/` }]} />
    </>
  )
}
