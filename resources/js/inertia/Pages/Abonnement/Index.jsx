import { Head } from '@inertiajs/react'
import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
const Index = ()=> {
    return <>
        <Head>
            <script
                async
                src="https://js.stripe.com/v3/pricing-table.js">
            </script>
        </Head>
        <div className="row">
            <div className="col-md-12">
                <stripe-pricing-table
                    pricing-table-id={'prctbl_1OazCpBIx8MeLW2g7cQQhetR'}
                    publishable-key="pk_test_51OLRiuBIx8MeLW2gFrfud7JJHkaKgs7eoK5B8EpTr4D1sNnCJiyPB9iDOCcKtMMU2TkpiGNfQqrx9PnQ9jqOA87j00DveUx1wC"
                >
                </stripe-pricing-table>
            </div>
        </div>
    </>
}
Index.layout = page =>  <DefaultLayout children={page} />
export default Index
