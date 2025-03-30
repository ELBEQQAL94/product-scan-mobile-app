export interface Slide {
    id: string;
    title: string;
    subtitle: string;
};

export const slides: Slide[] = [
    {
        id: '1',
        title: 'Welcome to TruthLabel',
        subtitle: "Scan products to instantly reveal what's really in them",
    },
    {
        id: '2',
        title: 'Analyze Any Product',
        subtitle: 'Works with both food and cosmetics to help you make informed choices',
    },
    {
        id: '3',
        title: 'Understand Ingredients',
        subtitle: 'Get clear explanations of what each ingredient is and its potential effects',
    },
    {
        id: '4',
        title: 'Health Score at a Glance',
        subtitle: 'Our AI analyzes ingredients to provide an easy-to-understand health rating',
    },
    {
        id: '5',
        title: 'Start Scanning Today',
        subtitle: 'Make healthier choices with just a quick scan',
    },
];
