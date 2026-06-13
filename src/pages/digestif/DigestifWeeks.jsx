import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { DIGESTIF_WEEKS } from '../../lib/digestifData';
export default function DigestifWeeks() {
  return <PlanGate><PlanWeeks weeks={DIGESTIF_WEEKS} backTo="/plans/confort-digestif" title="6 semaines" /></PlanGate>;
}