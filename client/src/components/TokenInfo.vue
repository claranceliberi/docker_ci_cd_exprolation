
<template>
    <section>
        <div class="status my-4">
            <span class="px-4 py-1 bg-green-500 text-white rounded-sm">Subscribed</span>
        </div>
        <div class="w-96">
            <table class="table-fixed capitalize w-full text-left">
                <tr>
                    <td>bought at</td>
                    <td class="font-bold">
                        :
                        <span class="ml-4">{{ new Date().toLocaleDateString() }}</span>
                    </td>
                </tr>

                <tr>
                    <td>expiry date</td>
                    <td class="font-bold">
                        :
                        <span class="ml-4">{{ new Date().toLocaleDateString() }}</span>
                    </td>
                </tr>
                <tr>
                    <td>ammount</td>
                    <td class="font-bold">
                        :
                        <span class="ml-4">1000</span>
                        <span class="ml-1">RWF</span>
                    </td>
                </tr>
                <tr>
                    <td>total days</td>
                    <td class="font-bold">
                        :
                        <span class="ml-4">10</span>
                    </td>
                </tr>
                <td>remaining days</td>
                <td class="font-bold">
                    :
                    <span class="ml-4">7</span>
                </td>
                <tr>
                    <td>meter number</td>
                    <td class="font-bold">
                        :
                        <span class="ml-4 uppercase">NMA92N2981</span>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>