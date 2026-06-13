import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { DIGESTIF_DAY } from '../../lib/digestifData';
export default function DigestifJournee() {
  return <PlanGate><PlanJournee day={DIGESTIF_DAY} backTo="/plans/confort-digestif" /></PlanGate>;
}
