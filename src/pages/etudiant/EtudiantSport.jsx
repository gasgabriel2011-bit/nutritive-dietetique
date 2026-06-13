import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { ETUDIANT_SPORT } from '../../lib/etudiantData';
export default function EtudiantSport() {
  return <PlanGate><PlanSport tips={ETUDIANT_SPORT} backTo="/plans/menu-etudiant" title="Sport étudiant gratuit" /></PlanGate>;
}