// Very simple random ID generator (not cryptographically secure)
export class IdGenerator {
  public static generate(): string {
    return (
      Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
    );
  }
}
