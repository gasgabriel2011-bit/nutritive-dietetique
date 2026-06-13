import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { DIGESTIF_DRINKS } from '../../lib/digestifData';
export default function DigestifBoissons() {
  return <PlanGate><PlanBoissons drinks={DIGESTIF_DRINKS} backTo="/plans/confort-digestif" /></PlanGate>;
}