import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { BUDGET_DAY } from '../../lib/budgetData';
export default function BudgetJournee() {
  return <PlanGate><PlanJournee day={BUDGET_DAY} backTo="/plans/petit-budget" /></PlanGate>;
}