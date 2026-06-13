import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { FAMILLE_SHOPPING } from '../../lib/familleData';
export default function FamilleShopping() {
  return <PlanGate><PlanShopping shopping={FAMILLE_SHOPPING} backTo="/plans/repas-famille" storageKey="nutrivie_famille_shopping" /></PlanGate>;
}