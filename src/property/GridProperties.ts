import log from 'winston';
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
    public getProperty(key: string, required = false): string | null {
        if (!this.mProperties) {
            this.mProperties = this.initializeConfigurationProperties();
        }
        let value: string | null = this.mProperties[key];
        if (value !== null && value.trim().length === 0) {
            value = null;
        }
        if (!value && required) {
            throw new Error("Property not found: " + key);
        }
        return value;
    }

    /**
     * Get an integer property by key
     *
     * @param key
     *            key
     * @param required
     *            true if required
     * @return integer value
     */
    public getIntegerProperty(required = false, ...properties: string[]): number | null {
        let value: number | null = null;
        const stringValue = this.getProperty(this.buildProperty(properties), required);
        if (stringValue !== null) {
            value = Number.parseInt(stringValue);
        }
        return value;
    }

    /**
     * Get a float by key
     *
     * @param key
     *            key
     * @param required
     *            true if required
     * @return float value
     */
    public getFloatProperty(required = false, ...properties: string[]): number | null {
		let value: number | null = null;
		const stringValue = this.getProperty(this.buildProperty(properties), required);
        if (stringValue != null) {
            value = Number.parseFloat(stringValue);
        }
        return value;
    }

    /**
     * Get a double by key
     *
     * @param key
     *            key
     * @param required
     *            true if required
     * @return double value
     */
    public getDoubleProperty(required = false, ...properties: string[]): number | null {
		let value: number | null = null;
		const stringValue = this.getProperty(this.buildProperty(properties), required);
        if (stringValue != null) {
            value = +stringValue;
        }
        return value;
    }

    /**
     * Get a boolean by key
     *
     * @param key
     *            key
     * @param required
     *            true if required
     * @return boolean value
     */
    public getBooleanProperty(required = false, ...properties: string[]): boolean | null {
        let value: boolean | null = null;
        const stringValue = this.getProperty(this.buildProperty(properties), required);
        if (stringValue !== null) {
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

        log.debug('Reading properties from ' + file);
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
        for (const property in properties) {
            if (property != null) {
                if (combined.length > 0) {
                    combined += PropertyConstants.PROPERTY_DIVIDER;
                }
                combined += property;
            }
        }
        return combined;
    }

}
