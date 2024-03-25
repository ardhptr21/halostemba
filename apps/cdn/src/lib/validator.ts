import { UploadedFile } from 'express-fileupload';

interface ValidatorConfig {
  mimes: string[];
  extensions: string[];
  maxSize: number;
}

export default class Validator {
  constructor(private readonly config: ValidatorConfig) {
    this.config.maxSize = this.config.maxSize * 1024 * 1024;
  }

  private validateMimes(file: UploadedFile): boolean {
    if (!this.config.mimes.length) return true;
    const mime = file.mimetype;
    return this.config.mimes.includes(mime);
  }

  private validateExtensions(file: UploadedFile): boolean {
    if (!this.config.extensions.length) return true;
    const extension = file.name.split('.').pop();
    return this.config.extensions.includes(extension);
  }

  private validateSize(file: UploadedFile): boolean {
    if (!this.config.maxSize) return true;
    const size = file.size;
    return size <= this.config.maxSize;
  }

  public validate(file: UploadedFile): {
    valid: boolean;
    error: string | null;
  } {
    if (!this.validateMimes(file)) {
      return {
        valid: false,
        error: `Invalid mime types. Allowed ${this.config.mimes.join(', ')}`,
      };
    }

    if (!this.validateExtensions(file)) {
      return {
        valid: false,
        error: `Invalid extensions. Allowed ${this.config.extensions.join(
          ', ',
        )}`,
      };
    }

    if (!this.validateSize(file)) {
      return {
        valid: false,
        error: `Invalid size. Max size is ${
          this.config.maxSize / (1024 * 1024)
        }MB.`,
      };
    }

    return { valid: true, error: null };
  }
}
