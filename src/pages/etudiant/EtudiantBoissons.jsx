import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { ETUDIANT_DRINKS } from '../../lib/etudiantData';
export default function EtudiantBoissons() {
  return <PlanGate><PlanBoissons drinks={ETUDIANT_DRINKS} backTo="/plans/menu-etudiant" /></PlanGate>;
}