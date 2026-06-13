import PlanGate from '../../components/PlanGate';
import PlanShopping from '../../components/plans/PlanShopping';
import { ETUDIANT_SHOPPING } from '../../lib/etudiantData';
export default function EtudiantShopping() {
  return <PlanGate><PlanShopping shopping={ETUDIANT_SHOPPING} backTo="/plans/menu-etudiant" storageKey="nutrivie_etudiant_shopping" /></PlanGate>;
}