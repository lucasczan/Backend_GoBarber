import { container } from 'tsyringe'

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import IStoravgeProvider from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IStoravgeProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
