export default function SectionHeaders({subHeader,mainHeader}){
    return (
        <main>
            <h2 className="text-primary font-bold text-4xl mb-2">
                {mainHeader}
            </h2>
            <h3 className="uppercase text-gray-500 font-semibold leading-4">
                {subHeader}
            </h3>
            
        </main>
    );
}