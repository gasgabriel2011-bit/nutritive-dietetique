import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { DIGESTIF_SHOPPING } from '../../lib/digestifData';
export default function DigestifShopping() {
  return <PlanGate><PlanShopping shopping={DIGESTIF_SHOPPING} backTo="/plans/confort-digestif" storageKey="nutrivie_digestif_shopping" /></PlanGate>;
}