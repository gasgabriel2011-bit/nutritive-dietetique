import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { ETUDIANT_DAY } from '../../lib/etudiantData';
export default function EtudiantJournee() {
  return <PlanGate><PlanJournee day={ETUDIANT_DAY} backTo="/plans/menu-etudiant" /></PlanGate>;
}