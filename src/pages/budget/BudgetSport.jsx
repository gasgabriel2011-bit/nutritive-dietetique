import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { BUDGET_SPORT } from '../../lib/budgetData';
export default function BudgetSport() {
  return <PlanGate><PlanSport tips={BUDGET_SPORT} backTo="/plans/petit-budget" title="Sport gratuit" /></PlanGate>;
}