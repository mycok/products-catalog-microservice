import { IsEmail, Length, MinLength, MaxLength, IsNotEmpty, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Description {
    @IsNotEmpty()
    @Length(2, 15)
    lang: string;

    @MinLength(2, { message: '$value is too short. $property must contain atleat 2 characters' })
    @MaxLength(500, { message: '$value is too long. $property must contain a maximum of 500 characters' })
    value: string;
}

export class Brand {
    @IsNumber()
    id: number;
    @IsString()
    name: string;
}

export class Shipping {
    @IsNumber()
    dimensions: {
        height: number,
        length: number,
        width: number,
    };
    weight: number
}

export class Attrs {
    @IsString()
    name: string;
    @IsString()
    value: string;
}

export class ProductValidationSchema {
    @Length(5, 50, { message: '$value is too short. $property must contain between $constraint1 - $constraint2 characters' })
    name: string;

    @MinLength(3, { message: '$value is too short. $property must contain atleat 2 characters' })
    @MaxLength(500, { message: '$value is too long. $property must contain a maximum of 500 characters' })
    description: string;

    @Length(2, 50, { message: '$value is too short. $property must contain between $constraint1 - $constraint2 characters' })
    category: string;

    @IsEmail()
    feedbackEmail: string;

    @MinLength(2, { message: '$value is too short. $property must contain atleast $constraint1 characters' })
    @MaxLength(20, { message: '$value is too short. $property must contain not more than $constraint1 characters' })
    ownerId: string;

    createdAt: Date;
    updatedAt: Date;

    @ValidateNested({ each: true })
    @Type(() => Description)
    desc: Description[];
    @Type(() => Brand)
    brand: Brand;
    @Type(() => Shipping)
    shipping: Shipping;
    @Type(() => Attrs)
    attrs: Attrs[];

    constructor(productInfo: any) {
        this.name = productInfo.name;
        this.description = productInfo.description;
        this.category = productInfo.category;
        this.feedbackEmail = productInfo.feedbackEmail;
        this.ownerId = productInfo.ownerId;
        this.desc = productInfo.desc;
        this.brand = productInfo.brand;
        this.shipping = productInfo.shipping;
        this.attrs = productInfo.attrs
    }
}
