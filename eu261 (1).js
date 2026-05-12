/**
 * EU Regulation 261/2004 – Compensation Calculator Engine
 * =========================================================
 * Implements the full legal logic for flight delay compensation claims.
 */

const EU261 = (() => {

  // ── Haversine distance in km ──────────────────────────────────────────────
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ── Regulation scope check ────────────────────────────────────────────────
  // Art. 3: Applies when departing from EU OR arriving in EU on EU/EEA carrier
  function isInScope(originEU, destEU, carrierEU) {
    if (originEU) return true;                      // departure from EU always covered
    if (destEU && carrierEU) return true;            // arrival in EU on EU carrier
    return false;
  }

  // ── Compensation tiers (Art. 7) ───────────────────────────────────────────
  function getCompensationTier(distanceKm) {
    if (distanceKm <= 1500) return { amount: 250, tier: "short" };
    if (distanceKm <= 3500) return { amount: 400, tier: "medium" };
    return { amount: 600, tier: "long" };
  }

  // ── Delay threshold (Art. 6 & 7) ─────────────────────────────────────────
  // Compensation kicks in at ≥ 3h arrival delay, regardless of departure delay
  function meetsDelayThreshold(delayHours) {
    return delayHours >= 3;
  }

  // ── 50% reduction rule (Art. 7 §2) ───────────────────────────────────────
  // Carrier may reduce by 50% for long-haul if delay < 4h
  function applyReductionRule(amount, distanceKm, delayHours) {
    if (distanceKm > 3500 && delayHours < 4) {
      return { reduced: true, finalAmount: amount * 0.5 };
    }
    return { reduced: false, finalAmount: amount };
  }

  // ── Main calculation ──────────────────────────────────────────────────────
  function calculate({ origin, destination, delayHours, carrierEU = true }) {
    const distanceKm = Math.round(haversine(
      origin.lat, origin.lon,
      destination.lat, destination.lon
    ));

    const inScope = isInScope(origin.eu, destination.eu, carrierEU);
    const qualifies = inScope && meetsDelayThreshold(delayHours);

    if (!inScope) {
      return {
        eligible: false,
        reason: "out_of_scope",
        reasonText: "Der Flug fällt nicht unter die EU-Verordnung 261/2004. Weder Abflug- noch Zielflughafen liegen in der EU, oder die Fluggesellschaft ist keine EU-Carrier.",
        distanceKm,
        delayHours,
      };
    }

    if (!qualifies) {
      return {
        eligible: false,
        reason: "below_threshold",
        reasonText: `Bei einer Verspätung von ${delayHours} Stunde${delayHours !== 1 ? "n" : ""} besteht noch kein Entschädigungsanspruch. Der Ankunftsverzug muss mindestens 3 Stunden betragen.`,
        distanceKm,
        delayHours,
        inScope: true,
      };
    }

    const tier = getCompensationTier(distanceKm);
    const { reduced, finalAmount } = applyReductionRule(tier.amount, distanceKm, delayHours);

    // Determine what rights apply beyond financial compensation
    const additionalRights = [];
    if (delayHours >= 2) additionalRights.push({ icon: "🍽️", text: "Anspruch auf Mahlzeiten & Erfrischungen (Art. 9)" });
    if (delayHours >= 5) additionalRights.push({ icon: "↩️", text: "Recht auf vollständige Erstattung des Ticketpreises (Art. 8)" });
    if (delayHours >= 5) additionalRights.push({ icon: "✈️", text: "Recht auf anderweitige Beförderung zum Zielort (Art. 8)" });
    // Overnight delay
    const isOvernightLikely = delayHours >= 4;
    if (isOvernightLikely) additionalRights.push({ icon: "🏨", text: "Anspruch auf Hotelunterbringung bei Übernachtung (Art. 9)" });

    const tierLabels = {
      short: "Kurzstrecke (≤ 1.500 km)",
      medium: "Mittelstrecke (1.500 – 3.500 km)",
      long: "Langstrecke (> 3.500 km)"
    };

    return {
      eligible: true,
      distanceKm,
      delayHours,
      compensationBase: tier.amount,
      compensationFinal: finalAmount,
      reduced,
      tierLabel: tierLabels[tier.tier],
      legalBasis: "Art. 7 VO (EG) Nr. 261/2004",
      additionalRights,
      inScope: true,
    };
  }

  return { calculate, haversine };
})();

// Export for Node/module environments too
if (typeof module !== "undefined") module.exports = EU261;
