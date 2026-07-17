export default interface AudioTrack {
  id: number;
  name: string;
  language: string;
  characteristics: string[];
  default: boolean;

  codec: string;
}
