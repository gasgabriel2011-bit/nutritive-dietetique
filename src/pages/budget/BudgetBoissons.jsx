import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { BUDGET_DRINKS } from '../../lib/budgetData';
export default function BudgetBoissons() {
  return <PlanGate><PlanBoissons drinks={BUDGET_DRINKS} backTo="/plans/petit-budget" /></PlanGate>;
}
