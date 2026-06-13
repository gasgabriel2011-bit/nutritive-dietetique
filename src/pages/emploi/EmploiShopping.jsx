import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { EMPLOI_SHOPPING } from '../../lib/emploiChargeData';
export default function EmploiShopping() {
  return <PlanGate><PlanShopping shopping={EMPLOI_SHOPPING} backTo="/plans/emploi-charge" storageKey="nutrivie_emploi_shopping" /></PlanGate>;
}