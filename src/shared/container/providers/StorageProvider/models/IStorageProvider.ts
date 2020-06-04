export default interface IStoravgeProvider{
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
