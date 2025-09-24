"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TestUIPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-8">UI Components Test Page</h1>

      {/* Button Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small Button</Button>
          <Button>Default Size</Button>
          <Button size="lg">Large Button</Button>
          <Button size="icon">🔥</Button>
        </div>
      </section>

      {/* Card Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a card description with border and soft shadow.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here. It has nice padding and spacing.</p>
          </CardContent>
          <CardFooter>
            <Button>Action Button</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Input & Textarea Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Forms</h2>
        <div className="max-w-md space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here..." />
          </div>
        </div>
      </section>

      {/* Accordion Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion</h2>
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Table Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Table</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV003</TableCell>
              <TableCell>Unpaid</TableCell>
              <TableCell>Bank Transfer</TableCell>
              <TableCell className="text-right">$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  )
}