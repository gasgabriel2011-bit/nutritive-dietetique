import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { FAMILLE_SPORT } from '../../lib/familleData';
export default function FamilleSport() {
  return <PlanGate><PlanSport tips={FAMILLE_SPORT} backTo="/plans/repas-famille" title="Activité familiale" /></PlanGate>;
}