interface HandleUpdateProductsProps {
    functionRequest: (id: number | "") => Promise<any>;
    router: any;
    pathName: string;
}

export const handleGeneric = ({ functionRequest, router, pathName }: HandleUpdateProductsProps) => async (id: number) => {
    try {
        const r = await functionRequest(id);
        router.push({
            pathname: pathName,
            params: { product: JSON.stringify(r) }
        });
    } catch (error) {
        console.error("Error loading product:", error);
    }
}