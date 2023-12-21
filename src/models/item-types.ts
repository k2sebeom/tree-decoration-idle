export const ItemTypes = {
    ORNAMENT: 'ornament',
}

interface DropResult {
    name: string;
    action: 'place' | 'delete';
    x: number;
    y: number;
}

export type {
    DropResult
}