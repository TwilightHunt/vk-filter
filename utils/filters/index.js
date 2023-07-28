import { countAgeByBDate } from "@/composables/useCounters";

export class Filter {
  constructor(value) {
    this.value = value;
  }
  max_age(max_age) {
    this.value = this.value.filter(
      (member) =>
        countAgeByBDate(member?.bdate) &&
        countAgeByBDate(member?.bdate) <= max_age
    );
    return this;
  }
  min_age(min_age) {
    this.value = this.value.filter(
      (member) =>
        countAgeByBDate(member?.bdate) &&
        countAgeByBDate(member?.bdate) >= min_age
    );
    return this;
  }
  sex(id) {
    this.value = this.value.filter((member) => member?.sex === id);
    return this;
  }
  city(id) {
    this.value = this.value.filter((member) => member?.city?.id === id);
    return this;
  }
  skipClosed() {
    this.value = this.value.filter((member) => !!member?.can_access_closed);
    return this;
  }
  skipDeleted() {
    this.value = this.value.filter((member) => !!!member?.deactivated);
    return this;
  }
}
