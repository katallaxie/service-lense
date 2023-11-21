import AddLensDialog from './components/add-lens'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

export default function Lenses() {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Lenses
          <SubNavSubtitle>Review specifications for workloads</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddLensDialog />
        </SubNavActions>
      </SubNav>
      <section>Lenses</section>
    </>
  )
}
