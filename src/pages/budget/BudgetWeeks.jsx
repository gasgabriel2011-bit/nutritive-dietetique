import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { BUDGET_WEEKS } from '../../lib/budgetData';
export default function BudgetWeeks() {
  return <PlanGate><PlanWeeks weeks={BUDGET_WEEKS} backTo="/plans/petit-budget" title="4 semaines petit budget" /></PlanGate>;
}