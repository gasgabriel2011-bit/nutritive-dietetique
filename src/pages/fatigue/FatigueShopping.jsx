import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { FATIGUE_SHOPPING } from '../../lib/antiFatigueData';
export default function FatigueShopping() {
  return <PlanGate><PlanShopping shopping={FATIGUE_SHOPPING} backTo="/plans/anti-fatigue" storageKey="nutrivie_fatigue_shopping" /></PlanGate>;
}