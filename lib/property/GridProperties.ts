import { KeyValueObject, propertiesToJson } from 'properties-file';
import { PropertyConstants } from './PropertyConstants';

/**
 * Grid property loader
 *
 * @author osbornb
 */
export abstract class GridProperties {
  /**
   * Properties
   */
  protected mProperties?: KeyValueObject;

  /**
   * Get the properties file name
   *
   * @return file name
   */
  public abstract getFile(): string;

  /**
   * Get a property by key
   *
   * @param key
   *            key
   * @param required
   *            true if required
   * @return value
   */
  public getProperty(required = false, key: string): string | undefined {
    if (!this.mProperties) {
      this.mProperties = this.initializeConfigurationProperties();
    }

    let value: string | undefined = this.mProperties[key];
    if (value && value.trim().length === 0) {
      value = undefined;
    }
    if (!value && required) {
      throw new Error('Property not found: ' + key);
    }
    return value;
  }

  /**
   * Get an integer property by key
   *
   * @param required
   *            true if required
   * @param key
   *            key
   * @return integer value
   */
  public getIntegerProperty(required = false, ...key: string[]): number | undefined {
    let value: number | undefined;
    const stringValue = this.getProperty(required, this.buildProperty(key));
    if (stringValue) {
      value = Number.parseInt(stringValue, 10);
    }
    return value;
  }

  /**
   * Get a float by key
   *
   * @param required
   *            true if required
   * @param key
   *            key
   * @return float value
   */
  public getFloatProperty(required = false, ...key: string[]): number | undefined {
    let value: number | undefined;
    const stringValue = this.getProperty(required, this.buildProperty(key));
    if (stringValue) {
      value = Number.parseFloat(stringValue);
    }
    return value;
  }

  /**
   * Get a double by key
   *
   * @param required
   *            true if required
   * @param key
   *            key
   * @return double value
   */
  public getDoubleProperty(required = false, ...key: string[]): number | undefined {
    let value: number | undefined;
    const stringValue = this.getProperty(required, this.buildProperty(key));
    if (stringValue) {
      value = +stringValue;
    }
    return value;
  }

  /**
   * Get a boolean by key
   *
   * @param required
   *            true if required
   * @param key
   *            key
   * @return boolean value
   */
  public getBooleanProperty(required = false, ...key: string[]): boolean | undefined {
    let value: boolean | undefined;
    const stringValue = this.getProperty(required, this.buildProperty(key));
    if (stringValue) {
      value = stringValue.toLowerCase() === 'true';
    }
    return value;
  }

  /**
   * Initialize the configuration properties
   *
   * @return properties
   */
  private initializeConfigurationProperties(): KeyValueObject {
    const file = this.getFile();

    // TODO check file property
    const properties = propertiesToJson(file);

    return properties;
  }

  /**
   * Build a combined property separated by
   * {@link PropertyConstants#PROPERTY_DIVIDER}
   *
   * @param properties
   *            property parts
   *
   * @return combined property
   */
  public buildProperty(properties: string[]): string {
    let combined = '';
    for (const property of properties) {
      if (property) {
        if (combined.length > 0) {
          combined += PropertyConstants.PROPERTY_DIVIDER;
        }
        combined += property;
      }
    }
    return combined;
  }
}
