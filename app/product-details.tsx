import { Ingredient, OpenFoodData } from "@/constants/responses";
import { Screens } from "@/constants/screens";
import { product_details } from "@/services";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    useColorScheme
} from "react-native"

const ProductDetails: React.FC = () => {
    // Hooks
    const router = useRouter();
    const local = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const bar_code = local.bar_code as string;

    // states
    const [product, setProduct] = useState<OpenFoodData>();
    const [score, setScore] = useState<string | null | undefined>("0");
    const [loading, setLoading] = useState<boolean>(false);

    const colors = {
        background: colorScheme === 'dark' ? '#121212' : 'white',
        text: colorScheme === 'dark' ? 'white' : 'black',
        border: colorScheme === 'dark' ? '#333333' : 'black',
        card: colorScheme === 'dark' ? '#1E1E1E' : 'white',
    };

    const fetch_product_details = async () => {
        const scoreStrings = [
            "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100",
            "5", "15", "25", "35", "45", "55", "65", "75", "85", "95",
            "3", "12", "27", "36", "48", "57", "69", "78", "87", "94",
            "7", "18", "22", "39", "44", "59", "63", "71", "88", "97",
            "2", "14", "29", "33", "47", "52", "68", "73", "84", "99",
            "6", "19", "24", "37", "43", "58", "62", "77", "86", "91",
            "1", "13", "26", "31", "49", "53", "64", "79", "82", "93",
            "8", "16", "28", "38", "42", "56", "67", "72", "89", "96",
            "4", "11", "21", "34", "46", "51", "61", "76", "83", "98",
            "9", "17", "23", "32", "41", "54", "66", "74", "81", "92"
        ];

        setLoading(true);
        try {
            const response = await product_details(bar_code);

            if (response) {
                const random_index = Math.floor(Math.random() * 100); //await chat(response);
                const answer = scoreStrings[random_index];
                const openFoodData: OpenFoodData = {
                    product: {
                        countries: response.product.countries,
                        image_url: response.product.image_url,
                        ingredients: response.product.ingredients,
                        labels: response.product.labels,
                        product_name: response.product.product_name,
                        product_name_ar: response.product.product_name_ar,
                        product_name_en: response.product.product_name_en,
                        product_name_fr: response.product.product_name_fr,
                        product_type: response.product.product_type
                    }
                }
                setProduct(openFoodData);
                setScore(answer);
            }
        } catch (error) {
            console.log('fetch product details get an error: ', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (scoreValue: string | null | undefined) => {
        if (!scoreValue) return 'red';

        const numScore = parseInt(scoreValue);
        if (numScore < 50) return 'red';
        if (numScore >= 50 && numScore <= 70) return '#FFD700'; // Yellow
        return 'green';
    };

    const retryScan = () => router.push(Screens.HOME_SCREEN as Href);

    useEffect(() => {
        fetch_product_details();
    }, [bar_code]);

    if (loading) return (
        <View>
            <Text style={{ color: colors.text }}>loading...</Text>
        </View>
    )

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header_container}>
                {product?.product.image_url ? (
                    <Image
                        source={{ uri: product?.product.image_url }}
                        resizeMode="contain"
                        width={150}
                        height={150}
                    />

                ) : (
                    <Image
                        source={require('@/assets/images/product_default_image.png')}
                        resizeMode="contain"
                        width={150}
                        height={150}
                        style={{ tintColor: colors.text }}
                    />
                )}
                <View style={styles.product_title_score_container}>
                    <Text style={[styles.product_title, { color: colors.text }]}>
                        {product?.product.product_name}
                    </Text>
                    <View style={styles.score_container}>
                        <View
                            style={[
                                styles.scoreIndicator,
                                { backgroundColor: getScoreColor(score) }
                            ]}
                        />
                        <Text style={[styles.product_score, { color: colors.text }]}>
                            {score}/100
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[styles.spacer, { backgroundColor: colors.border }]} />
            <ScrollView style={styles.ingredients_container}>
                <Text style={{ color: colors.text }}>Ingredients</Text>
                <View>
                    {
                        product?.product.ingredients ? product?.product.ingredients.map((ingrediant: Ingredient, index: number) => (
                            <View key={index} style={styles.ingredient_item}>
                                <Text style={{ color: colors.text }}>text: {ingrediant.text}</Text>
                                <Text style={{ color: colors.text }}>percent: {ingrediant.percent}</Text>
                                <Text style={{ color: colors.text }}>percent_max: {ingrediant.percent_max}</Text>
                                <Text style={{ color: colors.text }}>percent_min: {ingrediant.percent_min}</Text>
                                <Text style={{ color: colors.text }}>percent_estimate: {ingrediant.percent_estimate}</Text>
                                <View style={styles.spacer} />
                            </View>
                        )) : <View>
                            <Text style={{ color: colors.text }}>Ingredients not found!</Text>
                        </View>
                    }
                </View>
            </ScrollView>
            <View style={styles.scan_button_container}>
                <TouchableOpacity
                    style={styles.scan_button}
                    onPress={retryScan}
                >
                    <Text style={[styles.scan_button_text, { color: colors.text }]}>Scan again</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 30,
    },
    header_container: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    product_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    product_score: {
        fontSize: 20
    },
    score_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    product_title_score_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spacer: {
        height: 1,
        backgroundColor: "black",
        marginTop: 5,
        marginBottom: 5
    },
    ingredients_container: {
        marginBottom: 10,
        height: "60%",
    },
    ingredient_item: {
        marginBottom: 10,
        padding: 5,
    },
    scan_button_container: {
        paddingLeft: 40,
        paddingRight: 40
    },
    scan_button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
    },
    scan_button_text: {
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default ProductDetails;