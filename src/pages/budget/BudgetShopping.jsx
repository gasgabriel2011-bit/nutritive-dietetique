import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { BUDGET_SHOPPING } from '../../lib/budgetData';
export default function BudgetShopping() {
  return <PlanGate><PlanShopping shopping={BUDGET_SHOPPING} backTo="/plans/petit-budget" storageKey="nutrivie_budget_shopping" /></PlanGate>;
}
