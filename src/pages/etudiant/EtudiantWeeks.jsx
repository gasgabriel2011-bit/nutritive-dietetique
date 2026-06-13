import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { ETUDIANT_WEEKS } from '../../lib/etudiantData';
export default function EtudiantWeeks() {
  return <PlanGate><PlanWeeks weeks={ETUDIANT_WEEKS} backTo="/plans/menu-etudiant" title="4 semaines étudiant" /></PlanGate>;
}