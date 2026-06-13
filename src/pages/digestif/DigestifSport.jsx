import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { DIGESTIF_SPORT } from '../../lib/digestifData';
export default function DigestifSport() {
  return <PlanGate><PlanSport tips={DIGESTIF_SPORT} backTo="/plans/confort-digestif" title="Activité & bien-être digestif" /></PlanGate>;
}