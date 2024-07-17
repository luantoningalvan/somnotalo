export default interface IMusic {
  id: number;
  audioUrl: string;
  fileName: string;
  name: string;
  cover: string;
  duration: number;
  artist: {
    name: string;
    slug: string;
    avatar: string;
  };
}
